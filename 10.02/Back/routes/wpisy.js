const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
    const { tytul, tresc, kategoriaId } = req.body;
    try {
        const wpis = await prisma.wpis.create({
            data: { tytul, tresc, kategoriaId },
        });
        res.status(201).json(wpis);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const wpisy = await prisma.wpis.findMany({
            include: { kategoria: true, komentarze: true },
        });
        res.json(wpisy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const wpis = await prisma.wpis.findUnique({
            where: { id: parseInt(id) },
            include: { kategoria: true, komentarze: true },
        });
        wpis ? res.json(wpis) : res.status(404).json({ error: 'Wpis not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { tytul, tresc, kategoriaId } = req.body;
    try {
        const updatedWpis = await prisma.wpis.update({
            where: { id: parseInt(id) },
            data: { tytul, tresc, kategoriaId },
        });
        res.json(updatedWpis);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.wpis.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
