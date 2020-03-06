const LinkSelected = '@InCo-LinkSelected'

export const highlightsElement = (id) => {
    const element = document.getElementById(id)
    if(element && element !== undefined){
        var tag_li = document.getElementById('list-auto');
        var tag_a = tag_li.getElementsByTagName('a');
        for (let i=0; i<tag_a.length; i++ )
        {
            tag_a[i].style.backgroundColor = '#ECECEC'
            tag_a[i].style.cursor= 'pointer'
            tag_a[i].style.textDecoration = 'none'
            tag_a[i].style.color='#999'
            tag_a[i].style.fontSize='16px'
            tag_a[i].style.pointerEvents='auto'
        }
        element.style.backgroundColor = '#999'
        element.style.cursor= 'default'
        element.style.color='#FFF'
        element.style.fontSize='13pt'
        element.style.pointerEvents='none'
    }
}

export const getLinkAtual = () => sessionStorage.getItem(LinkSelected)

export const setLinkAtual = (Link) => {
    sessionStorage.setItem(LinkSelected, Link)
};
  