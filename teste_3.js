
//TESTANTDO

//const Cast = require('https://cofz.github.io/Scratch_extensions_test/cast.js');
//const MathUtil = require('https://cofz.github.io/Scratch_extensions_test/math-util.js');
//const Cast = require('../util/cast');
//const MathUtil = require('../util/math-util');
//const Timer = require('../util/timer');
///


var Notifications = function () {
};

/**
 * @return {object} This extension's metadata.
 */
Notifications.prototype.getInfo = function () {
    return {
        id: 'someBlocks',
        name: 'notifications',
        blocks: [
            {
                opcode: 'notification-show',
                blockType: Scratch.BlockType.COMMAND,
                blockAllThreads: false,
                text: 'Notify title [TITLE] content [CONTENT] image [IMAGE]',
                func: 'showNotification',
                arguments: {
                    TITLE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'Hello World!'
                    },
                    CONTENT: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'I\'m a notification.'
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
            }, 
            {
                opcode: 'example-noop',
                blockType: Scratch.BlockType.COMMAND,
                blockAllThreads: false,
                text: 'do nothing',
                func: 'noop'
            }, 
            {
                opcode: 'example-opcoes',
                blockType: Scratch.BlockType.COMMAND,
                blockAllThreads: false,
                text: 'choose [BRANCH]',
                arguments: {
                    BRANCH: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 1
                    }
                },
                func: 'noop'
            },

            { 
                opcode: 'teste-andar',
                blockType: Scratch.BlockType.COMMAND,
                blockAllThreads: false,
                text: 'Ande [NUMERO_PASSOS] passos',
                func: 'moveSteps',
                arguments: {
                    NUMERO_PASSOS: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: '10'
                    }
                }
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


Notifications.prototype.noop = function () {
};


Notifications.prototype.moveSteps = function(args, util) {
        const steps = Cast.toNumber(args.NUMERO_PASSOS);
        const radians = MathUtil.degToRad(90 - util.target.direction);
        const dx = steps * Math.cos(radians);
        const dy = steps * Math.sin(radians);
        util.target.setXY(util.target.x + dx, util.target.y + dy);
    };


Scratch.extensions.register(new Notifications());
navigator.Notification.requestPermission();
