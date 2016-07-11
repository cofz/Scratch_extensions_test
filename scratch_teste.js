(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(callback) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*10000);
    };
     ext.power = function(base, exponent) {
        return Math.pow(base, exponent);
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [ 
            
            // Block type, block name, function name
            [' ', 'my first block', 'my_first_block'],
            [' ', 'my second block', 'my_second_block'],
            ['w', 'wait random', 'wait_random'],
            ['R', '%n ^ %n', 'power', 2, 3],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});
