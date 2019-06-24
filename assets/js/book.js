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
    { fontSize: 12 },
    { fontSize: 14 },
    { fontSize: 16 },
    { fontSize: 18 },
    { fontSize: 20 },
    { fontSize: 22 },
    { fontSize: 24 }
]