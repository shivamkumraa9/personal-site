/* eslint-disable no-undef */
/* eslint-disable func-names */

const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-item a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // eslint-disable-next-line no-restricted-globals
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLi.forEach((li) => {
    li.classList.remove('active');
    if (li.classList.contains(current)) {
      li.classList.add('active');
    }
  });
});

(function ($) {
  // Navbar Scroll Animation
  $(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
    event.preventDefault();
    // const href = $.attr(this, 'href');
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 70,
    }, 500, () => {
      // window.location.hash = href;
    });
  });

  $('nav .dropdown').hover(function () {
    const $this = $(this);
    // timer;
    // clearTimeout(timer);
    $this.addClass('show');
    $this.find('> a').attr('aria-expanded', true);
    // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
    $this.find('.dropdown-menu').addClass('show');
  }, function () {
    const $this = $(this);
    // timer;
    // timer = setTimeout(function(){
    $this.removeClass('show');
    $this.find('> a').attr('aria-expanded', false);
    // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
    $this.find('.dropdown-menu').removeClass('show');
    // }, 100);
  });

  // scroll
  const scrollWindow = function () {
    $(window).scroll(function () {
      const $w = $(this);
      const st = $w.scrollTop();
      const navbar = $('.ftco_navbar');
      const sd = $('.js-scroll-wrap');

      if (st > 150) {
        if (!navbar.hasClass('scrolled')) {
          navbar.addClass('scrolled');
        }
      }
      if (st < 150) {
        if (navbar.hasClass('scrolled')) {
          navbar.removeClass('scrolled sleep');
        }
      }
      if (st > 350) {
        if (!navbar.hasClass('awake')) {
          navbar.addClass('awake');
        }

        if (sd.length > 0) {
          sd.addClass('sleep');
        }
      }
      if (st < 350) {
        if (navbar.hasClass('awake')) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
        if (sd.length > 0) {
          sd.removeClass('sleep');
        }
      }
    });
  };
  scrollWindow();

  const goHere = function () {
    $('.mouse-icon').on('click', (event) => {
      event.preventDefault();

      $('html,body').animate({
        scrollTop: $('#about-section').offset().top,
      }, 500, 'easeInOutExpo');

      return false;
    });
  };
  goHere();

  // typing Text animation
  const TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    const that = this;
    let delta = 180;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum += 1;
      delta = 500;
    }

    setTimeout(() => {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i += 1) {
      const toRotate = elements[i].getAttribute('data-rotate');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        // eslint-disable-next-line no-new
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }';
    document.body.appendChild(css);
  };
}(jQuery));

function percentageToDegrees(percentage) {
  // eslint-disable-next-line no-mixed-operators
  return percentage / 100 * 360;
}

$(() => {
  $('.progress').each(function () {
    const value = $(this).attr('data-value');
    const left = $(this).find('.progress-left .progress-bar');
    const right = $(this).find('.progress-right .progress-bar');

    if (value > 0) {
      if (value <= 50) {
        right.css('transform', `rotate(${percentageToDegrees(value)}deg)`);
      } else {
        right.css('transform', 'rotate(180deg)');
        left.css('transform', `rotate(${percentageToDegrees(value - 50)}deg)`);
      }
    }
  });

  const youtube = document.querySelectorAll('.youtube');

  for (let i = 0; i < youtube.length; i += 1) {
    const source = `https://img.youtube.com/vi/${youtube[i].dataset.embed}/sddefault.jpg`;

    const image = new Image();
    image.src = source;
    image.addEventListener('load', (function () {
      youtube[i].appendChild(image);
    }(i)));

    youtube[i].addEventListener('click', function () {
      const iframe = document.createElement('iframe');

      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('src', `https://www.youtube.com/embed/${this.dataset.embed}?rel=0&autoplay=1`);

      this.innerHTML = '';
      this.appendChild(iframe);
    });
  }
});


const projects = [
  {
    name: 'Sellify',
    modelId: 'sellify',
    totalcaroselImages: 7,
    description: 'Sellify is a SaaS app that allows the user to easily sell digital downloadable products, donations, or accept any other payment in just a few minutes.',
    type: 'Web application',
    imageDirName: 'sellify',
    technologies: 'Node js, Vue js, MongoDB, Express js, Bootstrap, Stripe',
    liveDemo: 'https://glamorous-sweatpants-bull.cyclic.app/',
    github: 'https://github.com/shivamkumraa9/sellify',
  },
  {
    name: 'Dev Forms',
    modelId: 'devforms',
    totalcaroselImages: 4,
    description: 'Devs forms is a SaaS application that allows users to create forms without any backend. Users can plug the endpoint into their forms and manage the rest from the dashboard.',
    type: 'Web application',
    imageDirName: 'forms',
    technologies: 'ExpressJs, ReactJS, MongoDB, Bootstrap.',
    liveDemo: 'https://devforms.cyclic.app/',
    github: 'https://github.com/shivamkumraa9/dev-forms',
  },
  {
    name: '4Pilots',
    modelId: 'pilots',
    totalcaroselImages: 7,
    description: '4Pilots is a startup run by an amazing team of entrepreneurs dedicated to stop the road accidents. I was hired to develop the internal dashboard for fleet managers and drivers.',
    type: 'Web application',
    imageDirName: '4pilots',
    technologies: 'Django, Vue js, Tailwind Css, Postgres, Pandas, Cassandra.',
  },
  {
    name: 'Mintted io',
    modelId: 'mintted',
    totalcaroselImages: 5,
    description: 'Mintted is a platform that allows creators and influencers to launch their own digital currency. I worked as a Lead full stack developer in collaboration with the WhataStoryTech Team Lead by Mr Raunak Hajela.',
    type: 'Web application',
    imageDirName: 'mintted',
    technologies: 'Node js, Vue js, Sails js, Tailwind CSS, MongoDB.',
  },
  {
    name: 'Pizzon',
    modelId: 'pizzon',
    totalcaroselImages: 4,
    description: 'Pizzon: A tantalizing pizza store website powered by Wordpress and Woocommerce, serving up a delicious array of flavors for an irresistible online ordering experience.',
    type: 'Website',
    imageDirName: 'pizza2',
    technologies: 'PHP, Wordpress, Woocommerce, Bootstrap, CSS.',
  },
  {
    name: 'Careo',
    modelId: 'careo',
    totalcaroselImages: 4,
    description: 'Careo: A dynamic fast food store website created with Wordpress and Woocommerce, offering a diverse menu of delectable choices for a convenient and satisfying online ordering experience.',
    type: 'Website',
    imageDirName: 'burger',
    technologies: 'PHP, Wordpress, Woocommerce, Bootstrap, CSS.',
  },
  {
    name: 'Sale Hub',
    modelId: 'salehub',
    totalcaroselImages: 3,
    description: 'Sale Hub: Your ultimate online apparel store powered by Shopify, featuring a wide range of trendy and affordable fashion choices to revamp your wardrobe effortlessly.',
    type: 'Website',
    imageDirName: 'apparel',
    technologies: 'Shopify, Stripe, CSS.',
  },
  {
    name: 'Simply Natural',
    modelId: 'ecom',
    totalcaroselImages: 3,
    description: 'Simply Natural: Embrace the beauty of greenery with our Wordpress and Woocommerce-powered website, offering a diverse selection of exquisite green plants to enhance your living space naturally.',
    type: 'Website',
    imageDirName: 'ecom',
    technologies: 'PHP, Wordpress, Woocommerce, Bootstrap, CSS.',
  },
];


let projectText = ''
let modelsText = '';

for (let i = 0; i < 4; i++) {
  let project = projects[i];
  projectText += `
  <div class="col-md-6 mb-4">
    <a href="#" data-toggle="modal" data-target="#${project.modelId}">
      <div style="border: 1px solid black;" class="project d-flex justify-content-center align-items-center">
        <img src="public/images/projects/${project.imageDirName}/1.webp" alt="" class="d-block" style="width:100%">
        <div class="overlay">
          <div class="text text-center p-4">
            <h3 class="text-white">${project.name}</h3>
            <span>${project.type}</span>
          </div>
        </div>
      </div>
    </a>
  </div>
  `;

  let indicators = '';

  for (let i = 0; i < project.totalcaroselImages; i += 1){
      indicators += `
      <li data-target="#${project.modelId}0" data-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></li>
      `
  }

  let images = '';
  for (let i = 0; i < project.totalcaroselImages; i += 1){
      images += `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="public/images/projects/${project.imageDirName}/${i + 1}.webp" loading="lazy" class="d-block w-100" alt="...">
    </div>
      `
  }

  let liveDemo = '';
  if (project.liveDemo) {
      liveDemo += `
      <p>
        <span style="font-weight: 600;">Live Demo:</span> <a href="${project.liveDemo}" target="_blank">${project.liveDemo}</a>
      </p>
      `
  }

  let github = '';
  if (project.github) {
      github += `
      <p>
          <span style="font-weight: 600;">Github:</span> <a href="${project.github}" target="_blank">${project.github}</a>
      </p>
      `
  }

  modelsText += `
  <div class="modal fade" id="${project.modelId}" tabindex="-1" role="dialog" aria-labelledby="jobTitle" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="jobTitle">${project.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="${project.modelId}0" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            ${indicators}
          </ol>
          <div style="border: 1px solid black;" class="carousel-inner">
            ${images}
          </div>
          <a class="carousel-control-prev" href="#<%= item.modelId %>0" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#<%= item.modelId %>0" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
          </a>
        </div>
        <hr />
        <div class="mt-3 light-black-color">
          ${liveDemo}
          ${github}
          <p>
            <span style="font-weight: 600;">Technologies:</span> ${project.technologies}
          </p>
          <p>
            ${project.description}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  `
}

document.querySelector('.projects-data').innerHTML = projectText;
document.querySelector('#projects-models').innerHTML = modelsText;
