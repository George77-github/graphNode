const { getAllNodesAndRelationships, createNode, createRelationship } = require('../models/neo4jModel');

const getAll = async (req, res) => {
    try {
        const data = await getAllNodesAndRelationships();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addNode = async (req, res) => {
    try {
        const { name } = req.body;  // Get parameters from API request
        if (!name) {
            return res.status(400).json({ error: "name are required." });
        }

        const newNode = await createNode(name);
        res.json(newNode);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addRelationship = async (req, res) => {
    try {
        const {  sourceProperty,  targetProperty, relationshipType } = req.body;

        if (!sourceProperty || !targetProperty || !relationshipType) {
            return res.status(400).json({ error: "All parameters are required." });
        }

        const newRelationship = await createRelationship( sourceProperty, targetProperty, relationshipType);
        res.json(newRelationship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    getAll,addNode,addRelationship
}