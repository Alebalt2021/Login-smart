$(document).ready(function () {
    $("#registro").hide();
    $("#content").hide();

    $("#btn-register").click(function () {
        $("#login-contenedor").hide();
        $("#registro").show();
        $("#img-creare").hide();
    });

    $("#btn-iniciarsesion").click(function () {
        $("#login-contenedor").show();
        $("#registro").hide();
        $("#img-creare").show();
    })

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDjSM-s3YBxgYlPtjvTk9hUqdkyOy4o8SI",
        authDomain: "proyecto-smart-dr.firebaseapp.com",
        projectId: "proyecto-smart-dr",
        storageBucket: "proyecto-smart-dr.appspot.com",
        messagingSenderId: "409233645053",
        appId: "1:409233645053:web:0b8bebef62552beb79cd94",
        measurementId: "G-XVSMCKDY65"
    };

    //Inicializar Firebase
    firebase.initializeApp(firebaseConfig);

    //Inicializar servicio de autentificacion
    const auth = firebase.auth();

    //Alerts
    const alertaError = document.querySelector("#alert-incor");

    const alertaComplete = document.querySelector("#alert-comple");

    const alertaError1 = document.querySelector("#alert-incor1");

    const alertaComplete1 = document.querySelector("#alert-comple1");

    //Login o inicio de sesion
    $("#btn-login").click(function (e) {
        e.preventDefault();
        //Variables de inputs
        var correo = $("#mail").val();
        var clave = $("#Input").val();

        if (correo.length == 0 || clave.length == 0) {
            alertaComplete.style.display = 'block';
            setTimeout(() => {
                alertaComplete.style.display = 'none';
            }, 3000);
            return;
        }
        //Usar servicio de login de firebase
        auth.signInWithEmailAndPassword(correo, clave)
            .then(userCredential => {
                Swal.fire({
                    title: 'Datos Correctos, Bienvenidos',
                    text: 'Preciones Ok para continuar',
                    background: "#fff",
                    // color de fondo de la ventana[abajo]
                    backdrop: true,
                    timer: 8000,
                    // tiempo de ventana [abajo]
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#f37db4',

                    imageUrl: 'assets/img/Q84E.gif',
                    imageWidth: '340px',
                    imageHeight: '260px',
                    imageAlt: 'Welcolme',
                })
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alertaError.style.display = 'block';
                setTimeout(() => {
                    alertaError.style.display = 'none';
                }, 3000);
            })
    })

    //Singup o crear cuenta
    $("#btn-singup").click(function (e) {
        e.preventDefault();
        //Variables de inputs
        var correo = $("#mail-new").val();
        var clave = $("#Input-pass").val();

        if (correo.length == 0 || clave.length == 0) {
            alertaComplete1.style.display = 'block';
            setTimeout(() => {
                alertaComplete1.style.display = 'none';
            }, 3000);
            return;
        }
        //Usar servicio de firebase para crear cuenta
        auth.createUserWithEmailAndPassword(correo, clave)
            .then(userCredential => {

                
                $("#registro").hide();

                location.href ="https://fernandaamelitc.github.io/Inicio/";
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alertaError1.style.display = 'block';
                setTimeout(() => {
                    alertaError1.style.display = 'none';
                }, 3000);
            })
    })
    //Desconexion de usuario
    //Boton LogOut
    $("#btn-logout").click(function (e) {
        e.preventDefault();
        auth.signOut().then(() => {
            Swal.fire({
                title: 'Sesion Cerrada',
                text: 'Preciones Ok para continuar',
                background: "#fff",
                // color de fondo de la ventana[abajo]
                backdrop: true,
                timer: 8000,
                // tiempo de ventana [abajo]
                timerProgressBar: true,
                allowOutsideClick: false,
                confirmButtonColor: '#f37db4',

                imageUrl: 'assets/img/Adios.gif',
                imageWidth: '340px',
                imageHeight: '260px',
                imageAlt: 'Good Bye'
            })
            $("#content").hide();
            $("#formularios").show();
        })
    })

    var provider = new firebase.auth.GoogleAuthProvider();
    //Inicar sesion con GOOGLE
    $("#btn-login-google").click(function (e) {
        e.preventDefault();
        auth.signInWithPopup(provider)
            .then(result => {
            })
            .catch(error => {
                Swal.fire({
                    title: 'No se pudo ingresar',
                    icon: 'error',
                    text: 'Preciones Ok para continuar',
                    background: "#fff",
                    // color de fondo de la ventana[abajo]
                    backdrop: true,
                    timer: 8000,
                    // tiempo de ventana [abajo]
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#f37db4',

                    imageUrl: 'assets/img/google.gif',
                    imageWidth: '300px',
                    imageHeight: '220px',
                    imageAlt: 'Google',
                });
                alert.console(error);
            })
    })

    var providerFace = new firebase.auth.FacebookAuthProvider();
    //Inciar sesion con Facebook
    $("#btn-login-facebook").click(function (e) {
        e.preventDefault();
        auth.signInWithPopup(providerFace)
            .then(result => {
                Swal.fire({
                    title: 'Ingreso con Facebook',
                    icon: 'success',
                    text: 'Preciones Ok para continuar',
                    background: "#fff",
                    // color de fondo de la ventana[abajo]
                    backdrop: true,
                    timer: 8000,
                    // tiempo de ventana [abajo]
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#f37db4',

                    imageUrl: 'assets/img/facebook.gif',
                    imageWidth: '300px',
                    imageHeight: '220px',
                    imageAlt: 'Facebook',
                })
                    ;
            })
            .catch(error => {
                Swal.fire({
                    title: 'No se pudo ingresar',
                    icon: 'error',
                    text: 'Preciones Ok para continuar',
                    background: "#fff",
                    // color de fondo de la ventana[abajo]
                    backdrop: true,
                    timer: 8000,
                    // tiempo de ventana [abajo]
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#f37db4',

                    imageUrl: 'assets/img/facebook.gif',
                    imageWidth: '340px',
                    imageHeight: '260px',
                    imageAlt: 'Facebook',
                });
                alert.console(error);
            })
    })

    auth.onAuthStateChanged((user) => {
        if (user) {
            location.href ="https://fernandaamelitc.github.io/Inicio/";
            //Sesion Iniciada
            $("#login-contenedor").hide();
            $("#registro").hide();
            $("#circulo-text").hide();
            $("#formularios").hide();
        }
        else {
            //Sesion finalizada
            $("#content").hide();
            $("#desaparecido").hide();
        }
    })

    const db = firebase.firestore();
    //Publicar un nuevo estado
    $("#btn-publish").click(function (e) {
        e.preventDefault();
        let postText = $("#status-text").val();
        let date = new Date();
        db.collection("posts").add({
            text: postText,
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        })
            .then((docRef) => {
                Swal.fire({
                    title: 'Estado publicado',
                    icon: 'success',
                    text: 'Preciones Ok para continuar',
                    background: "#fff",
                    // color de fondo de la ventana[abajo]
                    backdrop: true,
                    timer: 8000,
                    // tiempo de ventana [abajo]
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#f37db4',
                })
                $("#status-text").val('');
                readPosts();
            })
            .catch((error) => {
                alert(error);
            })
    })

    function readPosts() {
        db.collection("posts").get().then((posts) => {
            listPosts(posts.docs);
        })
    }

    function listPosts(data) {
        var divContent = $("#post-feed");
        divContent.empty();
        if (data.length > 0) {
            let content = "";
            data.forEach(document => {
                let doc = document.data();
                const divPost = `
                <div class="items-post">
                    <div class="content-parrafo-item" style="padding-bottom: 3px;margin-top: 10px;padding-top: 20px;padding-right: 5px;padding-left: 5px;">
                        <div class="item-use">
                        <img src="https://cdn.discordapp.com/attachments/842291717376966696/932995059022975066/38020d9bd6e501c1a04149bf8677fdca.jpg" alt="user">
                        <h3>user</h3>
                        </div>
                        
                        <div class="item-p">
                        <div class="dropdown" style="top: -8px;right: 20px;">
                            <label class="dropdown-toggle" data-bs-toggle="dropdown""><i class="fas fa-infinity"></i></label>
                            <ul class="dropdown-menu">
                                <button id="btn-editar" data-id="${document.id}" class="btn btn-edit-post mt-2 mx-2 dropdown-item"><i class="fas fa-edit lead me-2"></i>Editar</button></a></li>
                                <button id="btn-eliminar" data-id="${document.id}" class="btn btn-delete-post mt-2 dropdown-item"><i class="fas fa-trash-alt lead me-2"></i>Eliminar</button></a></li>
                            </ul>
                        </div>
                    <div class="parrafo-p"> 
                    <p id="imten-p-content" style="margin-bottom: 0px; margin-bottom: -8px;" >${doc.text}</p>
                    </div> 
                    <span class="hora-minutos mt-3">Publicado el: ${doc.day}/${doc.month}/${doc.year} Hora ${doc.hours}:${doc.minutes}:${doc.seconds}.</span>
                    <br>
                    <br>
                    <textarea style='display: none;'></textarea>
                    <button data-id="${document.id}" style='display: none;' class="btn btn-info btn-save-post"><i class="far fa-save lead me-2"></i>Guardar</button>
                    <button style='display: none;' class="btn btn-info btn-cancel-post"><i class="fas fa-ban lead me-2"></i>Cancelar</button>
                    
                    <br>
                    <br>

                </div>
                </div>
                </div>
                <div>
                
                
                </div>
                
                `;
                content += divPost;
            });
            divContent.append(content);
            //Agregar listener a btn-delete
            const btnDelete = document.querySelectorAll(".btn-delete-post");
            btnDelete.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const id = e.target.dataset.id;
                    DeletePost(id);
                })
            })
            const btnEdit = document.querySelectorAll(".btn-edit-post");
            btnEdit.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const id = e.target.dataset.id;
                    OpenEdit(e, id, btn);
                })
            })
        }
    }
    function OpenEdit(id, button) {
        let ulParent = button.parentNode;
        let divParent = ulParent.parentNode;
        let parent = divParent.parentNode;
        let textEdit = $(parent).children().eq(3);
        let btnEdit = $(parent).children().eq(4);
        let btnCancel = $(parent).children().eq(5);
        let btnLike = $(parent).children().eq()

        textEdit.show();
        btnEdit.show();
        btnCancel.show();

        btnEdit.on("click", function (e) {
            SaveUpdate(e, id, textEdit.val())
        });

        btnCancel.on("click", function () {
            cancelUpdate(textEdit, btnEdit, btnCancel);
        });
    }
    function cancelUpdate(textarea, buttonEdit, buttonCancel) {
        textarea.hide();
        buttonEdit.hide();
        buttonCancel.hide();
    }
    function DeletePost(id) {
        db.collection("posts").doc(id).delete().then(() => {
            alert("Se ha eliminado correctamente");
            readPosts();
        })
            .catch((error) => {
                console.error("Detalle del Error: ", error);
            });
    }
    function UpdatePost(id) {
        db.collection("posts").doc(id).get().then((doc) => {
            Swal.fire({
                title: 'Se ha eliminado correctamente',
                icon: 'success',
                text: 'Preciones Ok para continuar',
                background: "#fff",
                // color de fondo de la ventana[abajo]
                backdrop: true,
                timer: 8000,
                // tiempo de ventana [abajo]
                timerProgressBar: true,
                allowOutsideClick: false,
                confirmButtonColor: '#f37db4',
            })
            readPosts();
        })
            .catch((error) => {
                console.error("Detalle del Error: ", error);
            });
    }

    function SaveUpdate(e, id_post, text_new) {
        e.preventDefault();
        db.collection("posts").doc(id_post).update({
            text: text_new,
        }).then(() => {
            Swal.fire({
                title: 'Post Actualizado',
                icon: 'success',
                text: 'Preciones Ok para continuar',
                background: "#fff",
                // color de fondo de la ventana[abajo]
                backdrop: true,
                timer: 8000,
                // tiempo de ventana [abajo]
                timerProgressBar: true,
                allowOutsideClick: false,
                confirmButtonColor: '#f37db4',
            })
            readPosts();
        })
            .catch((error) => {
                alert("Error:", error);
            });

    }

    $("#btn_update").click(function (e) {
        e.preventDefault();
        let post_upgrade = $("").val();
        let id_post = $("").val();
        db.collection("posts").doc(id_post).update({
            post: post_upgrade,
        }).then(() => {
            Swal.fire({
                title: 'Post Actualizado',
                icon: 'success',
                text: 'Preciones Ok para continuar',
                background: "#fff",
                // color de fondo de la ventana[abajo]
                backdrop: true,
                timer: 8000,
                // tiempo de ventana [abajo]
                timerProgressBar: true,
                allowOutsideClick: false,
                confirmButtonColor: '#f37db4',
            })
            readPosts();
        })
            .catch((error) => {
                alert("Error: ", error);
            })
    })
})