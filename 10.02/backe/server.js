const http = require('http');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');  // Import cors
const prisma = new PrismaClient();
const { parse } = require('url');
const { StringDecoder } = require('string_decoder');

const PORT = 3001;

// Utility function to handle JSON responses
const sendJsonResponse = (res, statusCode, data) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(JSON.stringify(data));
};

// CORS configuration
const corsMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Allow specific headers
    // If preflight request, respond immediately
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
    } else {
        next();  // Proceed to the next middleware
    }
};

// Connect to the database
prisma.$connect()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit if connection fails
    });

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Apply CORS middleware
    corsMiddleware(req, res, () => {
        const { pathname } = parse(req.url, true);
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        // Collect request data
        req.on('data', chunk => {
            buffer += decoder.write(chunk);
        });

        req.on('end', async () => {
            buffer += decoder.end();

            if (req.method === 'GET' && pathname === '/') {
                sendJsonResponse(res, 200, {
                    message: 'Welcome to the Blog API!',
                    endpoints: [
                        { method: 'GET', path: '/posts', description: 'List all posts' },
                        { method: 'GET', path: '/posts/:id', description: 'Get single post with comments' },
                        { method: 'POST', path: '/posts/:id', description: 'Add a comment to a post' }
                    ]
                });
            } else if (req.method === 'GET' && pathname === '/posts') {
                try {
                    const posts = await prisma.wpis.findMany({
                        include: {
                            kategoria: true,
                            komentarze: true,
                        },
                    });
                    sendJsonResponse(res, 200, posts);
                } catch (error) {
                    console.error(error);
                    sendJsonResponse(res, 500, { error: 'An error occurred while fetching posts' });
                }
            } else if (req.method === 'GET' && pathname.startsWith('/posts/')) {
                const postId = parseInt(pathname.split('/')[2]);
                try {
                    const post = await prisma.wpis.findUnique({
                        where: { id: postId },
                        include: {
                            kategoria: true,
                            komentarze: true,
                        },
                    });

                    if (!post) {
                        sendJsonResponse(res, 404, { error: 'Post not found' });
                    } else {
                        sendJsonResponse(res, 200, post);
                    }
                } catch (error) {
                    console.error(error);
                    sendJsonResponse(res, 500, { error: 'An error occurred while fetching the post' });
                }
            } else if (req.method === 'POST' && pathname.startsWith('/posts/')) {
                const postId = parseInt(pathname.split('/')[2]);

                try {
                    const { text } = JSON.parse(buffer);

                    if (!text) {
                        sendJsonResponse(res, 400, { error: 'Comment text is required' });
                        return;
                    }

                    const newComment = await prisma.komentarz.create({
                        data: {
                            tresc: text,
                            wpisId: postId,
                        },
                    });

                    const updatedComments = await prisma.komentarz.findMany({
                        where: { wpisId: postId },
                    });

                    sendJsonResponse(res, 201, updatedComments);
                } catch (error) {
                    console.error(error);
                    sendJsonResponse(res, 500, { error: 'An error occurred while adding the comment' });
                }
            } else {
                sendJsonResponse(res, 404, { error: 'Not Found' });
            }
        });
    });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await prisma.$disconnect();
    process.exit(0);
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
