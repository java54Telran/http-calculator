import http from 'node:http';
import CalculatorService from './service/CalculatorService.mjs';
import { operations } from './config/operations.mjs';
import CalculatorView from './view/CalculatorView.mjs';
const server = http.createServer();
const PORT = 3500;
server.listen(PORT, () => console.log(`server is listening on port ${server.address().port}`));
new CalculatorService(server, operations);
const view = new CalculatorView();
server.on("request", (req, res) => {
    res.setHeader('content-type', 'text/html');
    const urlTokens = req.url.split('/');
    const operands = [];
    const errorMessage = validateAndFillOperands(urlTokens, operands);
    if (errorMessage) {
        const html = view.getHtml(errorMessage, true);
        res.end(html);
    } else {
        server.emit(urlTokens[1], operands, res); 
    }

    

    
})
    function fillOperands(urlTokens, operands) {
        const op1 = +urlTokens[2];
        const op2 = +urlTokens[3];
        let res;
        if (!isNaN(op1) && !isNaN(op2)) {
            operands[0] = op1;
            operands[1] = op2;
        } else {
            res = "Wrong operands";
        }
        return res;

    }
    function validateAndFillOperands(urlTokens, operands) {
        let errorMessage = undefined;
        errorMessage = validateMethod(urlTokens[1]);
        if(!errorMessage) {
            errorMessage = fillOperands(urlTokens, operands);
        }
        return errorMessage;

    }
    function validateMethod(methodName) {
        if(!operations.has(methodName)) {
            return `${methodName} is unsupported`
        }
    }
