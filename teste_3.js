var SomeBlocks = function (runtimeProxy) {
    /**
     * A proxy to communicate with the Scratch 3.0 runtime across a worker boundary.
     * @type {Runtime}
     */
    this.runtime = runtimeProxy;
};

/**
 * @return {object} This extension's metadata.
 */
SomeBlocks.prototype.getInfo = function () {
    return {
        // Required: the machine-readable name of this extension.
        // Will be used as the extension's namespace.
        id: 'someBlocks',

        // Optional: the human-readable name of this extension as string.
        // This and any other string to be displayed in the Scratch UI may either be
        // a string or a call to `intlDefineMessage`; a plain string will not be
        // translated whereas a call to `intlDefineMessage` will connect the string
        // to the translation map (see below). The `intlDefineMessage` call is
        // similar to `defineMessages` from `react-intl` in form, but will actually
        // call some extension support code to do its magic. For example, we will
        // internally namespace the messages such that two extensions could have
        // messages with the same ID without colliding.
        // See also: https://github.com/yahoo/react-intl/wiki/API#definemessages
        name: intlDefineMessage({
            id: 'extensionName',
            defaultMessage: 'Some Blocks',
            translationHint: 'Extension name'
        }),

        // Optional: URI for a block icon, to display at the edge of each block for this extension. 
        // Data URI OK.
        // TODO: what file types are OK? All web images? Just PNG?
        blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',

        // Optional: URI for an icon to be displayed in the blocks category menu.
        // If not present, the menu will display the block icon, if one is present.
        // Otherwise, the category menu shows its default filled circle.
        // Data URI OK.
        // TODO: what file types are OK? All web images? Just PNG?
        menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',

        // Optional: Link to documentation content for this extension.
        // If not present, offer no link.
        docsURI: 'https://....',

        // Required: the list of blocks implemented by this extension,
        // in the order intended for display.
        blocks: [
            {
                // Required: the machine-readable name of this operation.
                // This will appear in project JSON.
                opcode: 'myReporter', // becomes 'someBlocks.myReporter'

                // Required: the kind of block we're defining, from a predefined list:
                // 'command' - a normal command block, like "move {} steps"
                // 'reporter' - returns a value, like "direction"
                // 'Boolean' - same as 'reporter' but returns a Boolean value
                // 'hat' - starts a stack if its value is truthy
                // 'conditional' - control flow, like "if {}" or "repeat {}"
                // A 'conditional' block may return the one-based index of a branch
                // to run, or it may return zero/falsy to run no branch. Each time a
                // child branch finishes, the block is called again. This is only a
                // slight change to the current model for control flow blocks, and is
                // also compatible with returning true/false for an "if" or "repeat"
                // block.
                // TODO: Consider Blockly-like nextStatement, previousStatement, and
                // output attributes as an alternative. Those are more flexible, but
                // allow bad combinations.
                blockType: 'reporter',

                // Required for conditional blocks, ignored for others: the number of
                // child branches this block controls. An "if" or "repeat" block would
                // specify a branch count of 1; an "if-else" block would specify a
                // branch count of 2.
                // TODO: should we support dynamic branch count for "switch"-likes?
                branchCount: 0,

                // Optional, default false: whether or not this block ends a stack.
                // The "forever" and "stop all" blocks would specify true here.
                terminal: true,

                // Optional, default false: whether or not to block all threads while
                // this block is busy. This is for things like the "touching color"
                // block in compatibility mode, and is only needed if the VM runs in a
                // worker. We might even consider omitting it from extension docs...
                blockAllThreads: false,

                // Required: the human-readable text on this block, including argument
                // placeholders. Argument placeholders should be in [MACRO_CASE] and
                // must be [ENCLOSED_WITHIN_SQUARE_BRACKETS].
                text: intlDefineMessage({
                    id: 'myReporter',
                    defaultMessage: 'letter [LETTER_NUM] of [TEXT]',
                    translationHint: 'Label on the "myReporter" block'
                }),

                // Required: describe each argument.
                // Note that this is an array: the order of arguments will be used
                arguments: {
                    // Required: the ID of the argument, which will be the name in the
                    // args object passed to the implementation function.
                    LETTER_NUM: {
                        // Required: type of the argument / shape of the block input
                        type: 'number',

                        // Optional: the default value of the argument
                        default: 1
                    },

                    // Required: the ID of the argument, which will be the name in the
                    // args object passed to the implementation function.
                    TEXT: {
                        // Required: type of the argument / shape of the block input
                        type: 'string',

                            // Optional: the default value of the argument
                        default: intlDefineMessage({
                            id: 'myReporter.TEXT_default',
                            defaultMessage: 'text',
                            translationHint: 'Default for "TEXT" argument of "myReporter"'
                        })
                    }
                },

                // Required: the function implementing this block.
                func: 'myReporter',

                // Optional: list of target types for which this block should appear.
                // If absent, assume it applies to all builtin targets -- that is:
                // ['sprite', 'stage']
                filter: ['someBlocks.wedo2', 'sprite', 'stage']
            },
            {
                // Another block...
            }
        ],

        // Optional: define extension-specific menus here.
        menus: {
            // Required: an identifier for this menu, unique within this extension.
            menuA: [
                // Static menu: list items which should appear in the menu.
                {
                    // Required: the value of the menu item when it is chosen.
                    value: 'itemId1',

                    // Optional: the human-readable label for this item.
                    // Use `value` as the text if this is absent.
                    text: intlDefineMessage({
                        id: 'menuA_item1',
                        defaultMessage: 'Item One',
                        translationHint: 'Label for item 1 of menu A'
                    })
                },

                // The simplest form of a list item is a string which will be used as
                // both value and text.
                'itemId2'
            ],

            // Dynamic menu: returns an array as above.
            // Called each time the menu is opened.
            menuB: 'getItemsForMenuB'
        },

        // Optional: translations
        translation_map: {
            de: {
                'extensionName': 'Einige Blöcke',
                'myReporter': 'Buchstabe [LETTER_NUM] von [TEXT]',
                'myReporter.TEXT_default': 'Text',
                'menuA_item1': 'Artikel eins',

                // Dynamic menus can be translated too
                'menuB_example': 'Beispiel',

                // This message contains ICU placeholders (see `myReporter()` below)
                'myReporter.result': 'Buchstabe {LETTER_NUM} von {TEXT} ist {LETTER}.'
            },
            it: {
                // ...
            }
        },

        // Optional: list new target type(s) provided by this extension.
        targetTypes: [
            'wedo2', // automatically transformed to 'someBlocks.wedo2'
            'speech' // automatically transformed to 'someBlocks.speech'
        ]
    };
};

/**
 * Implement myReporter.
 * @param {object} args - the block's arguments.
 * @property {string} MY_ARG - the string value of the argument.
 * @returns {string} a string which includes the block argument value.
 */
SomeBlocks.prototype.myReporter = function (args) {
    // This message contains ICU placeholders, not Scratch placeholders
    const message = intlDefineMessage({
        id: 'myReporter.result',
        defaultMessage: 'Letter {LETTER_NUM} of {TEXT} is {LETTER}.',
        description: 'The text template for the "myReporter" block result'
    });

    // Note: this implementation is not Unicode-clean; it's just here as an example.
    const result = args.TEXT.charAt(args.LETTER_NUM);

    return message.format({
        LETTER_NUM: args.LETTER_NUM,
        TEXT: args.TEXT,
        LETTER: result
    });
};
