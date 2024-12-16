const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
    const { tresc, autor, wpisId } = req.body;
    try {
        const komentarz = await prisma.komentarz.create({
            data: { tresc, autor, wpisId },
        });
        res.status(201).json(komentarz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const komentarze = await prisma.komentarz.findMany({
            include: { wpis: true },
        });
        res.json(komentarze);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const komentarz = await prisma.komentarz.findUnique({
            where: { id: parseInt(id) },
        });
        komentarz
            ? res.json(komentarz)
            : res.status(404).json({ error: 'Komentarz not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { tresc, autor, wpisId } = req.body;
    try {
        const updatedKomentarz = await prisma.komentarz.update({
            where: { id: parseInt(id) },
            data: { tresc, autor, wpisId },
        });
        res.json(updatedKomentarz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.komentarz.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
