document.addEventListener('DOMContentLoaded', function () {
    const $ = document.querySelector.bind(document);

    fetch("/websites.json")
        .then(rs => rs.json())
        .then(autocompleteData => M.Autocomplete.init($("#website"), {
            data: autocompleteData
        }));

    (function () {
        let masterPassword = localStorage.getItem("masterPassword");
        if (masterPassword) {
            $("#save").checked = true;
            $("#masterPassword").value = masterPassword;
            M.updateTextFields();
        }
    })();

    function generatePassword(website, masterPassword) {
        return crypto.subtle.digest(
            "SHA-1",
            new TextEncoder().encode(`${masterPassword}|${website}\n`)
        ).then(value => btoa(String.fromCharCode(...new Uint8Array(value.slice(0, 12)))));
    }


    $("#generate").addEventListener("click", function onGenerate() {
        let website = $("#website").value;
        let masterPassword = $("#masterPassword").value;
        if ($("#save").checked) {
            localStorage.setItem("masterPassword", masterPassword);
        } else {
            localStorage.removeItem("masterPassword");
            $("#masterPassword").value = "";
        }
        generatePassword(website, masterPassword).then(value => {
            navigator.clipboard.writeText(value).then(function () {
                M.toast({html: 'Password copied into clipboard.'});
            }, function () {
                M.toast({html: 'Error occurred.<i class="material-icons prefix">error</i>'});
            });
        });
    });

});

