const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Sample todo items
const todoItems = [
    { id: 1, text: 'Review project requirements' },
    { id: 2, text: 'Design user interface' },
    { id: 3, text: 'Implement core features' },
    { id: 4, text: 'Test application functionality' }
];

function getHtmlRows() {
    return todoItems.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.text}</td>
            <td>
                <button class="action-btn edit-btn" onclick="startEdit(${index})">
                    Edit
                </button>
            </td>
        </tr>
    `).join('');
}

function handleRequest(req, res) {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, html) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
                return;
            }
            
            const processedHtml = html.replace('{{rows}}', getHtmlRows());
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(processedHtml);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
}

const server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Focus: Item editing functionality');
});