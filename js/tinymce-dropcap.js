(function() {
    tinymce.create('tinymce.plugins.DropcapPlugin', {
        init: function(editor, url) {
            editor.addButton('dropcap', {
                title: 'Drop Cap',
                image: url + '/../images/dropcap-icon.png',
                onclick: function() {
                    editor.windowManager.open({
                        title: 'Add Drop Cap',
                        body: [
                            {
                                type: 'listbox', 
                                name: 'style',
                                label: 'Style',
                                values: [
                                    {text: 'Simple', value: 'simple'},
                                    {text: 'Fancy', value: 'fancy'},
                                    {text: 'Modern', value: 'modern'}
                                ]
                            },
                            {
                                type: 'textbox',
                                name: 'size',
                                label: 'Size (px)',
                                value: '60'
                            }
                        ],
                        onsubmit: function(e) {
                            var selection = editor.selection.getContent();
                            if (selection) {
                                var firstChar = selection.charAt(0);
                                var remainingText = selection.substring(1);
                                
                                editor.insertContent(
                                    '<span class="dropcap ' + e.data.style + 
                                    '" style="font-size:' + e.data.size + 'px">' + 
                                    firstChar + '</span>' + remainingText
                                );
                            }
                        }
                    });
                }
            });
        },
        
        createControl: function(n, cm) {
            return null;
        },
        
        getInfo: function() {
            return {
                longname: 'Drop Cap',
                author: 'Your Name',
                authorurl: 'https://example.com',
                infourl: 'https://example.com/info',
                version: "1.0"
            };
        }
    });
    
    tinymce.PluginManager.add('dropcap', tinymce.plugins.DropcapPlugin);
})();