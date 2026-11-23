// 햄버거 메뉴: 사이드바와 어두운 판에 "open" 클래스를 붙였다 떼기만 함
// 실제로 어떻게 보일지는 ainz_style.css의 .sidebar.open / .overlay.open 이 결정
function openNav() {
    document.getElementById("sidenav").classList.add("open");
    document.getElementById("overlay").classList.add("open");
}

function closeNav() {
    document.getElementById("sidenav").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
}
