const dgram = require('dgram');

const PORT = 8889;
const HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

drone.on('message', message => {
    console.log(`${message}`);
});

const handleError = errorMessage => {
    if (errorMessage) {
        console.log(`Error: ${errorMessage}`);
    }
}

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

(async () => {
    const commands = ['command', 'battery?', 'takeoff', '', 'land'];
    for(let i = 0; i < commands.length; i++) {
        await wait(2);
        const cmd = commands[i];
        console.log(cmd);
        drone.send(cmd, 0, cmd.length, PORT, HOST, handleError);
    }
})();
