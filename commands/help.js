module.exports = {
    name: 'help',
    alias: ['h','ayuda'],
    run: async (client, message, args) => {
        message.reply('¡AYUDA!');
    }
}