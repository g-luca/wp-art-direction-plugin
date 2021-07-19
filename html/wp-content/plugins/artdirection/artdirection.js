(function (blocks, editor, i18n, element, components, _) {
    var __ = i18n.__;
    var el = element.createElement;
    var RichText = editor.RichText;
    var MediaUpload = editor.MediaUpload;

    blocks.registerBlockType('wp-artdirection/image', {
        title: __('Image | ArtDirection', 'wp-artdirection'),
        icon: 'index-card',
        category: 'media',
        attributes: {
            title: {
                type: 'array',
                source: 'children',
                selector: 'h4',
            },
            mediaIdMobile: {
                type: 'number',
            },
            mediaIdDesktop: {
                type: 'number',
            },
            mediaUrlMobile: {
                type: 'string',
                source: 'attribute',
                selector: 'img',
                attribute: 'src',
            },
            mediaUrlDesktop: {
                type: 'string',
                source: 'attribute',
                selector: 'img',
                attribute: 'src',
            },
        },

        example: {
            attributes: {
                title: __('Chocolate Chip Cookies', 'wp-artdirection'),
                mediaUrlMobile: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2ChocolateChipCookies.jpg/320px-2ChocolateChipCookies.jpg',
                mediaUrlDesktop: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2ChocolateChipCookies.jpg/320px-2ChocolateChipCookies.jpg',
            },
        },

        edit: function (props) {
            var attributes = props.attributes;

            var onSelectImageMobile = function (media) {
                return props.setAttributes({
                    mediaUrlMobile: media.url,
                    mediaIdMobile: media.id,
                });
            };


            var onSelectImageDesktop = function (media) {
                return props.setAttributes({
                    mediaUrlDesktop: media.url,
                    mediaIdDesktop: media.id,
                });
            };

            return el(
                'div', {
                    className: props.className
                },
                el(RichText, {
                    tagName: 'h4',
                    inline: true,
                    placeholder: __(
                        'Write image description',
                        'wp-artdirection'
                    ),
                    value: attributes.title,
                    onChange: function (value) {
                        props.setAttributes({
                            title: value
                        });
                    },
                }),
                el(
                    'div', {
                        className: 'image'
                    },
                    el(MediaUpload, {
                        onSelect: onSelectImageMobile,
                        allowedTypes: 'image',
                        value: attributes.mediaIdMobile,
                        render: function (obj) {
                            return el(
                                components.Button, {
                                    className: attributes.mediaIdMobile ?
                                        'image-button' : 'button button-large',
                                    onClick: obj.open,
                                },
                                !attributes.mediaIdMobile ?
                                __('Upload Image Mobile', 'wp-artdirection') :
                                el('img', {
                                    src: attributes.mediaUrlMobile
                                })
                            );
                        },
                    })
                ), el(
                    'div', {
                        className: 'image'
                    },
                    el(MediaUpload, {
                        onSelect: onSelectImageDesktop,
                        allowedTypes: 'image',
                        value: attributes.mediaIdDesktop,
                        render: function (obj) {
                            return el(
                                components.Button, {
                                    className: attributes.mediaIdDesktop ?
                                        'image-button' : 'button button-large',
                                    onClick: obj.open,
                                },
                                !attributes.mediaIdDesktop ?
                                __('Upload Image Desktop', 'wp-artdirection') :
                                el('img', {
                                    src: attributes.mediaUrlDesktop
                                })
                            );
                        },
                    })
                ),

            );
        },
        save: function (props) {
            var attributes = props.attributes;

            return el(
                'div', {
                    className: props.className
                },
                el(RichText.Content, {
                    tagName: 'h4',
                    value: attributes.title,
                }),
                el(
                    'picture', {
                        className: "image"
                    },
                    el('source', {
                        srcset: attributes.mediaUrlDesktop,
                        media: "(min-width: 600px)"
                    }),
                    el('img', {
                        src: attributes.mediaUrlMobile
                    }),
                ),

            );
        },
    });
})(
    window.wp.blocks,
    window.wp.editor,
    window.wp.i18n,
    window.wp.element,
    window.wp.components,
    window._
);