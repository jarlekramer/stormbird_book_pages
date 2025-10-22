// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded "><a href="different_versions/versions_intro.html"><strong aria-hidden="true">1.</strong> Overview of different versions</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="different_versions/io_overview.html"><strong aria-hidden="true">1.1.</strong> General about input and output</a></li><li class="chapter-item expanded "><a href="different_versions/python_interface.html"><strong aria-hidden="true">1.2.</strong> Python interface</a></li><li class="chapter-item expanded "><a href="different_versions/fmu_version.html"><strong aria-hidden="true">1.3.</strong> Functional Mockup Unit</a></li><li class="chapter-item expanded "><a href="different_versions/openfoam_version.html"><strong aria-hidden="true">1.4.</strong> OpenFOAM version</a></li></ol></li><li class="chapter-item expanded "><a href="line_model/line_model_intro.html"><strong aria-hidden="true">2.</strong> Line model</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="line_model/building_line_model.html"><strong aria-hidden="true">2.1.</strong> Building a line model</a></li><li class="chapter-item expanded "><a href="line_model/circulation_strength.html"><strong aria-hidden="true">2.2.</strong> Circulation strength</a></li><li class="chapter-item expanded "><a href="line_model/move_line_models.html"><strong aria-hidden="true">2.3.</strong> Move and modify a line model</a></li><li class="chapter-item expanded "><a href="line_model/force_calculations.html"><strong aria-hidden="true">2.4.</strong> Force calculations</a></li></ol></li><li class="chapter-item expanded "><a href="sectional_models/sectional_models_intro.html"><strong aria-hidden="true">3.</strong> Sectional models</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="sectional_models/foil_model.html"><strong aria-hidden="true">3.1.</strong> Foil model</a></li><li class="chapter-item expanded "><a href="sectional_models/varying_foil_model.html"><strong aria-hidden="true">3.2.</strong> Varying foil model</a></li><li class="chapter-item expanded "><a href="sectional_models/rotating_cylinder.html"><strong aria-hidden="true">3.3.</strong> Rotating cylinder</a></li></ol></li><li class="chapter-item expanded "><a href="lifting_line/lifting_line_intro.html"><strong aria-hidden="true">4.</strong> Lifting line simulations</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="lifting_line/simulation_overview.html"><strong aria-hidden="true">4.1.</strong> Simulation overview</a></li><li class="chapter-item expanded "><a href="lifting_line/solver.html"><strong aria-hidden="true">4.2.</strong> Solver</a></li><li class="chapter-item expanded "><a href="lifting_line/wake.html"><strong aria-hidden="true">4.3.</strong> Wake</a></li><li class="chapter-item expanded "><a href="lifting_line/velocity_input.html"><strong aria-hidden="true">4.4.</strong> Velocity input</a></li></ol></li><li class="chapter-item expanded "><a href="actuator_line/actuator_line.html"><strong aria-hidden="true">5.</strong> Actuator line simulations</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="actuator_line/simulation_overview.html"><strong aria-hidden="true">5.1.</strong> Simulation overview</a></li><li class="chapter-item expanded "><a href="actuator_line/velocity_sampling.html"><strong aria-hidden="true">5.2.</strong> Velocity sampling</a></li><li class="chapter-item expanded "><a href="actuator_line/force_projection.html"><strong aria-hidden="true">5.3.</strong> Force projection</a></li><li class="chapter-item expanded "><a href="actuator_line/cfd_interface.html"><strong aria-hidden="true">5.4.</strong> CFD interface</a></li></ol></li><li class="chapter-item expanded "><a href="utils/utils_intro.html"><strong aria-hidden="true">6.</strong> Other functionalities</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="utils/wind_model.html"><strong aria-hidden="true">6.1.</strong> Effective wind model</a></li><li class="chapter-item expanded "><a href="utils/control_system.html"><strong aria-hidden="true">6.2.</strong> Control system</a></li><li class="chapter-item expanded "><a href="utils/empirical_models.html"><strong aria-hidden="true">6.3.</strong> Empirical models</a></li></ol></li><li class="chapter-item expanded "><a href="literature/literature_intro.html"><strong aria-hidden="true">7.</strong> Literature</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="literature/similar_simulation_methods.html"><strong aria-hidden="true">7.1.</strong> Simulation methods</a></li><li class="chapter-item expanded "><a href="literature/validation_data.html"><strong aria-hidden="true">7.2.</strong> Validation data</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
