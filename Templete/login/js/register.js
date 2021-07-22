function getToken() {
    return localStorage.getItem('token');
  }
  
  async function login(event) {
    event.preventDefault();
    event.stopPropagation();
  
    const nicknameElement = document.querySelector('#nickname');
    const emailElement = document.querySelector('#email');
    const passwordElement = document.querySelector('#password');
    
    const nickname = nicknameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
  
    console.log(email, password);
  
    try {
      const res = await axios.post('http://localhost:8080/user/create', {
        nickname,
        email,
        password,
      });
      const { token } = res.data;
      if (token === undefined) {
        return;
      }
      localStorage.setItem('token', token);
      location = '/';
    } catch (error) {
      const data = error.response.data;
      if (data) {
        const state = data.error;
        if (state === 'USER_NOT_EXIST') {
          alert('사용자가 존재하지 않습니다.');
        } else if (state === 'PASSWORD_NOT_MATCH') {
          alert('비밀번호가 틀렸습니다.');
        }
      }
    }
  }
  
  function bindLoginButton() {
    const form = document.querySelector('#form-login');
    form.addEventListener('submit', login);
  }
  
  async function main() {
    // 버튼에 이벤트 연결
    bindLoginButton();
  
    // 토큰 체크
    const token = getToken();
    if (token !== null) {
      location.assign('/');
      return;
    }
  }
  
  document.addEventListener('DOMContentLoaded', main);
  