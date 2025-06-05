import { exec } from 'child_process';

export function temNginx() {
    return new Promise((resolve) => {
        exec('nginx -v', (error, _stdout, stderr) => {
            resolve(!error && stderr.includes('nginx version'));
        });
    });
}