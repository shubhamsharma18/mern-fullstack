import express from 'express';
import os from 'node:os';
import fs from 'node:fs/promises';
import path from 'node:path';
import EventEmitter from 'node:events';

const app = express();
const PORT = 3000;
const systemEvents = new EventEmitter();

// 1. Alert Logic (EventEmitter)
systemEvents.on('low-memory', (freeMem) => {
    console.log(`⚠️ ALERT: Low Memory! Only ${freeMem} MB left.`);
});

// 2. Logging Function
const logSystemHealth = async () => {
    const freeMem = Math.round(os.freemem() / 1024 / 1024);
    const totalMem = Math.round(os.totalmem() / 1024 / 1024);
    const usage = `Time: ${new Date().toLocaleTimeString()} | Free RAM: ${freeMem}MB / ${totalMem}MB\n`;

    if (freeMem < 2048) {
        systemEvents.emit('low-memory', freeMem);
    }

    // const logPath = path.join(process.cwd(), 'system_health.log');
    await fs.appendFile("./system_health.log", usage);
};

// Start background logging
setInterval(logSystemHealth, 5000);

// --- 3. EXPRESS ROUTES ---

// Home Route
app.get('/', (req, res) => {
    res.send('<h1>System Logger is Running</h1><p>Visit <a href="/stats">/stats</a> to see logs.</p>');
});

// Stats Route (Reading file)
app.get('/stats', async (req, res) => {
    try {
        // const logPath = path.join(process.cwd(), 'system_health.log');

        const data = await fs.readFile("./system_health.log", 'utf-8');
        
        // Express automatically sets Content-Type to text/plain or text/html
        res.send(`<pre>${data}</pre>`); 
    } catch (error) {
        res.status(500).send("Error reading log file.");
    }
});

// Server Listen
app.listen(PORT, () => {
    console.log(`🚀 Express Server started at http://localhost:${PORT}`);
    console.log('📊 Monitoring system health...');
});

