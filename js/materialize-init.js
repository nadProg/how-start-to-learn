document.addEventListener('DOMContentLoaded', () => {
  const sidenavElems = document.querySelectorAll('.sidenav');
  const scrollspyElems = document.querySelectorAll('.scrollspy');
  const collapsibleElems = document.querySelectorAll('.collapsible');
  const tooltips = document.querySelectorAll('.material-tooltip');
  const tooltippedElems = document.querySelectorAll('.tooltipped');

  /* eslint-disable */
  M.Sidenav.init(sidenavElems);
  M.ScrollSpy.init(scrollspyElems);
  M.Collapsible.init(collapsibleElems);
  M.Tooltip.init(tooltippedElems);
  /* eslint-enable */

  collapsibleElems.forEach((elem) => {
    elem.addEventListener('click', (evt) => {
      const expandedIcons = evt.currentTarget.querySelectorAll('.expanded');
      const header = evt.target.closest('.collapsible-header');

      if (!header || !evt.target.contains(header)) return;
      const icon = header.querySelector('.expand-icon');

      expandedIcons.forEach((expandedIcon) => {
        if (expandedIcon !== icon) {
          expandedIcon.classList.remove('expanded');
        }
      });

      icon.classList.toggle('expanded');
    });
  });

  tooltips.forEach((tooltip) => {
    tooltip.classList.add('green');
    tooltip.classList.add('lighten-2');
  });
});
