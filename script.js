document.addEventListener('DOMContentLoaded', function() {
    function createRipple(event, button) {
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        button.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    }

    const disableButtonAnimation = document.body.classList.contains('no-button-animation');

    if (!disableButtonAnimation) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (btn.type === 'submit') return;
                
                e.preventDefault();
                const ripple = document.createElement('div');
                ripple.className = 'fullscreen-ripple';
                ripple.style.setProperty('--x', e.clientX + 'px');
                ripple.style.setProperty('--y', e.clientY + 'px');
                document.body.appendChild(ripple);
                const href = btn.getAttribute('href');
                setTimeout(() => {
                    window.location.href = href;
                }, 450);
            });
        });
    }

    const form = document.getElementById('contactForm');
    const contactPopup = document.getElementById('popupModal');
    const closeBtn = document.getElementById('popupClose');
    const okBtn = document.getElementById('popupOkBtn');
    
    if (form && contactPopup) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            contactPopup.classList.add('active');
            form.reset();
        });
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                contactPopup.classList.remove('active');
            });
        }
        if (okBtn) {
            okBtn.addEventListener('click', function() {
                contactPopup.classList.remove('active');
            });
        }
        window.addEventListener('click', function(e) {
            if (e.target === contactPopup) {
                contactPopup.classList.remove('active');
            }
        });
    }

    const menuIcon = document.getElementById('menu-icon');
    const navbarLinks = document.querySelector('.navbar-links');

    if (menuIcon && navbarLinks) {
        menuIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            navbarLinks.classList.toggle('active');
            menuIcon.classList.toggle('bx-x');
        });

        document.querySelectorAll('.navbar-links a').forEach(link => {
            link.addEventListener('click', function() {
                navbarLinks.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            });
        });

        document.addEventListener('click', function(e) {
            if (navbarLinks.classList.contains('active') && 
                !navbarLinks.contains(e.target) && 
                !menuIcon.contains(e.target)) {
                navbarLinks.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        });
    }
});