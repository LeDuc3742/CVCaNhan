// AOS
AOS.init({
  duration: 1200,
  easing: 'ease-in-out-back',
  once: true,
  mirror: false
});

// Kích hoạt animation thanh kỹ năng
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fill").forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      const width = bar.style.width;
      bar.style.width = bar.getAttribute("style").split(":")[1];
    }
  });
});

// Reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".section, .project-card, .skill").forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

// Parallax + scroll + chuột
const bg = document.getElementById('parallax');
let mouseX = 0, mouseY = 0, scrollY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
});

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

function animateBG() {
  if (bg) {
    bg.style.transform = `translate(${mouseX}px, ${mouseY + scrollY * 0.2}px)`;
  }
  requestAnimationFrame(animateBG);
}
animateBG();

// Xoay hình trụ khi cuộn (hiệu ứng giống xoay 3D)
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;

  sections.forEach((section, index) => {
    const offsetTop = section.offsetTop;
    const height = section.offsetHeight;
    const rotation = ((scrollPos - offsetTop) / height) * 90;

    if (scrollPos + window.innerHeight > offsetTop && scrollPos < offsetTop + height) {
      section.style.transform = `rotateX(${rotation}deg)`;
    } else {
      section.style.transform = 'rotateX(0deg)';
    }
  });
});

// Tạo modal khi click vào mindmap-item
document.querySelectorAll('.mindmap-item').forEach(item => {
  item.addEventListener('click', () => {
    const detail = item.querySelector('.mindmap-detail')?.innerHTML || 'No content';

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modalBox = document.createElement('div');
    modalBox.className = 'modal-box';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => overlay.remove();

    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = detail;

    modalBox.appendChild(closeBtn);
    modalBox.appendChild(content);
    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);
  });
});

document.querySelectorAll('.music-card audio').forEach(audio => {
  audio.addEventListener('play', () => {
    document.querySelectorAll('.music-card audio').forEach(other => {
      if (other !== audio) other.pause();
    });
  });
});

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close-btn");

// Mở modal khi click vào ảnh
document.querySelectorAll(".project-card img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

// Đóng khi click nút X
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Đóng khi click ngoài vùng ảnh
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});