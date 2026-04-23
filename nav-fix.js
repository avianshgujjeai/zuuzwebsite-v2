/**
 * nav-fix.js — ZUUZ Website Navigation Fixer
 * Injected on every page. Rewrites broken/missing hrefs to correct existing files.
 * All files live in root except platform/ and pricing/ subfolders.
 */
(function() {
  // Map of broken/missing hrefs -> correct working hrefs
  var FIX = {
    // Non-existent files -> real replacements
    'zuuz-homepage-v3.html':          'index.html',
    'zuuz-platform-overview-v3.html': 'zuuz-platform-overview-v2.html',
    'zuuz-ai-agents.html':            'zuuz-agent-library.html',
    'zuuz-pricing.html':              'pricing/index.html',
    // Resolve bare hashes used as placeholders
    '#':                              'index.html'
  };

  // Determine if we are in a subfolder (platform/ or pricing/)
  var depth = window.location.pathname.split('/').length - 2; // 0 = root, 1 = subfolder
  var prefix = depth > 0 ? '../' : '';

  function fixHref(href) {
    if (!href) return null;
    // Strip leading ./ or ../
    var clean = href.replace(/^\.\//,'').replace(/^\.\.\//, '');
    if (FIX[clean] !== undefined) {
      return prefix + FIX[clean];
    }
    return null;
  }

  function fixAllLinks() {
    var links = document.querySelectorAll('a[href]');
    links.forEach(function(a) {
      var h = a.getAttribute('href');
      var fixed = fixHref(h);
      if (fixed !== null) {
        a.setAttribute('href', fixed);
      }
    });

    // Also fix logo link that points to homepage
    var logos = document.querySelectorAll('a');
    logos.forEach(function(a) {
      var h = a.getAttribute('href');
      if (h === 'zuuz-homepage-v3.html' || h === './zuuz-homepage-v3.html') {
        a.setAttribute('href', prefix + 'index.html');
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixAllLinks);
  } else {
    fixAllLinks();
  }
})();
