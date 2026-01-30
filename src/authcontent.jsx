const [user, setUser] = useState(null);

useEffect(() => {
  fetch("http://localhost:3000/api/user/me", {
    credentials: "include"
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data) setUser(data.user);
    });
}, []);
