
var Notifications = function () {
};

Notifications.prototype.getInfo = function () {
    return {
        id: 'Criacao_Graficos',
        name: 'Graficos',
        blocks: [
            {
                opcode: 'grafico',
                blockType: Scratch.BlockType.COMMAND,
                blockAllThreads: false,
                text: 'Grafico [TITLE] cor [CONTENT] image [IMAGE]',
                func: 'showNotification',
                arguments: {
                    TITLE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'Tipo de grafico'
                    },
                    CONTENT: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'cor do grafico'
                    },
                    IMAGE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'https://jgames101.github.io/scratch-extensions/cat.png'
                    }
                }
            },
            {
                opcode: 'notification-permitted',
                blockType: Scratch.BlockType.BOOLEAN,
                text: 'notifications permitted?',
                func: 'notPermitted'
            }
        ],

        // translations
        translation_map: {
            fr: {
                'extensionName': 'Notifications',
                'notification-show': 'Nouveau Notification titre [TITLE] soustitre [CONTENT] image [IMAGE]',
                'notification-show.TITLE_default': 'Bonjour, Monde!',
                'notification-show.CONTENT_default': 'Je suis un notification.',
                'notification-permitted': 'Notifications Permission?'
            }
        }
    };
};

/**
 * Implement myReporter.
 * @param {object} args - the block's arguments.
 * @property {number} LETTER_NUM - the string value of the argument.
 * @property {string} TEXT - the string value of the argument.
 * @returns {string} a string which includes the block argument value.
 */
Notifications.prototype.showNotification = function (args) {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        var notification = new Notification(args.TITLE, {
        icon: args.IMAGE,
        body: args.CONTENT,
        title: args.TITLE
    })};
};

Notifications.prototype.notPermitted = function () {
    if (Notification.permission !== "granted")
		return false;
	else {
		return true;
    };
};

Scratch.extensions.register(Graficos());
navigator.Notification.requestPermission();
