export function themeList() {
    return [
        {
            alias: 'Default',
            name: '默认',
            style: {
                body: {
                    'color': '#4c5059',
                    'background': '#cecece',
                },

            }
        },
        {
            alias: 'Gold',
            name: '雅致',
            style: {
                body: {
                    'color': '#5c5b56',
                    'background': '#c6c2b6',
                },

            }
        },
        {
            alias: 'Eye',
            name: '护眼',
            style: {
                body: {
                    'color': '#404c42',
                    'background': '#a9c1a9',
                }
            }
        },
        {
            alias: 'Night',
            name: '夜间',
            style: {
                body: {
                    'color': '#cecece',
                    'background': '#000000',
                }
            }
        }
    ]
}

export const FONT_SIZE_LIST = [
    { fontSize: 3.2 },  // 12px
    { fontSize: 3.733 }, // 14px
    { fontSize: 4.267 }, // 16px
    { fontSize: 4.8 },
    { fontSize: 5.333 },
    { fontSize: 5.867 },
    { fontSize: 6.4 }
]

export function addCss(src) {
    const head = document.getElementsByTagName('head')[0]

    let links = Array.from(document.getElementsByTagName('link'))
    links.forEach(item => {
        if (item.type === 'text/css') {
            head.removeChild(item)
        }
    })
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', src)
    link.setAttribute('type', 'text/css')
    head.appendChild(link)
}