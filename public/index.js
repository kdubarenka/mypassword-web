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

    new ClipboardJS('.copy-btn').on('success', function () {
        M.Toast.dismissAll();
        M.toast({
            html: 'Password has been copied to clipboard.'
        });
    });

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
                M.toast({
                    html: `<span>Password has been generated.</span>
<input id="password" value="${value}" style="position: absolute; left: -9999px" readonly>
<button class="btn-flat toast-action copy-btn" data-clipboard-target="#password">Copy</button>`
                });
            }, () => M.toast({html: 'Error occurred.<i class="material-icons prefix">error</i>'})
        );
    });

});

