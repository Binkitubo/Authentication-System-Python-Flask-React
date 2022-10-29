const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: null,
		currentUser: null,
		message: null,
	  },
	  actions: {
		// Use getActions to call a function within a fuction
		signup: async (e, navigate) => {
		  e.preventDefault();
		  const { email, password } = getStore();
  
		  try {
			const resp = await fetch(
			  "https://3001-4geeksacade-reactflaskh-ba3see99w40.ws-eu73.gitpod.io/api/signup",
			  {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({
				  email: email,
				  password: password,
				}),
			  }
			);
			const { status, created } = await resp.json();
			if (status === "success") {
			  setStore({ created: created });
			  sessionStorage.setItem("created", created);
			  navigate("/sign-in");
			}
		  } catch (error) {
			console.error("Error loading message from backend", error);
		  }
		},
  
		login: async (e, navigate) => {
		  e.preventDefault();
		  const { email, password } = getStore();
  
		  try {
			const resp = await fetch(
			  "https://3001-4geeksacade-reactflaskh-ba3see99w40.ws-eu73.gitpod.io/api/token",
			  {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({
				  email: email,
				  password: password,
				}),
			  }
			);
			const { status, user, token } = await resp.json();
			if (status === "success") {
			  setStore({ currentUser: user, token: token });
			  sessionStorage.setItem("token", token);
			  navigate("/profile");
			}
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},

		logout: (navigate) => {
			sessionStorage.removeItem("token");
			setStore({ token: null, currentUser: null });
			navigate("/");
		  },
  
		handleChange: (e) => {
		  const { name, value } = e.target;
		  setStore({
			[name]: value,
		  });
		},
  
	  },
	};
  };
  
  export default getState;
  