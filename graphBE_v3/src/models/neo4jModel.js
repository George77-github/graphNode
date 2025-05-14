const neo4j = require('neo4j-driver');

// Connect to Neo4j
const driver = neo4j.driver('neo4j+s://18d2d37e.databases.neo4j.io', neo4j.auth.basic('neo4j', 'Cz_ZYcEa1jgVGoA687ChC9LzuevMnPYZZMnaHAn6Joo'));
const session = driver.session();

const getAllNodesAndRelationships = async () => {
    const session = driver.session();
    try {
        // Get all nodes
        const nodesQuery = await session.run("MATCH (n) RETURN id(n) AS id, n.name AS label");
        const relationshipsQuery = await session.run("MATCH (a)-[r]->(b) RETURN id(r) AS id, a.name AS Start_Node, type(r) AS Relationship_Type, b.name AS End_Node");

        // Format results
        const nodes = nodesQuery.records.map(record => ({
            id: record.get("label"),
            label: record.get("label")
        }));

        const relationships = relationshipsQuery.records.map(record => ({
            source: record.get("Start_Node"),
            label: record.get("Relationship_Type"),
            target: record.get("End_Node")
        }));

        return { nodes, relationships };

    } catch (error) {
        throw new Error("Error fetching data: " + error);
    } finally {
        await session.close();
    }
};


const createNode = async (name) => {
    const session = driver.session();
    try {
        const query = `CREATE (n:Vehicle {name: $name}) RETURN n`;
        const result = await session.run(query, { name });

        return result.records.map(record => record.get("n").properties);
    } catch (error) {
        throw new Error("Error creating node: " + error);
    } finally {
        await session.close();
    }
};

const createRelationship = async ( sourceProperty, targetProperty, relationshipType) => {
    const session = driver.session();
    try {
        const query = `
            MATCH (source:Vehicle {name: $sourceName}), (target:Vehicle {name: $targetName})
            CREATE (source)-[r:${relationshipType}]->(target)
            RETURN source, r, target
        `;
        const result = await session.run(query, { sourceName: sourceProperty, targetName: targetProperty });

        return result.records.map(record => ({
            sourceNode: record.get("source").properties,
            relationship: relationshipType,
            targetNode: record.get("target").properties
        }));
    } catch (error) {
        throw new Error("Error creating relationship: " + error);
    } finally {
        await session.close();
    }
};

module.exports = { getAllNodesAndRelationships, createNode, createRelationship };