const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
    const { nazwa } = req.body;
    try {
        const kategoria = await prisma.kategoria.create({
            data: { nazwa },
        });
        res.status(201).json(kategoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const kategorie = await prisma.kategoria.findMany({
            include: { wpisy: true },
        });
        res.json(kategorie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const kategoria = await prisma.kategoria.findUnique({
            where: { id: parseInt(id) },
            include: { wpisy: true },
        });
        kategoria
            ? res.json(kategoria)
            : res.status(404).json({ error: 'Kategoria not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a kategoria by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nazwa } = req.body;
    try {
        const updatedKategoria = await prisma.kategoria.update({
            where: { id: parseInt(id) },
            data: { nazwa },
        });
        res.json(updatedKategoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.kategoria.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
