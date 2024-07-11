async function File_Uploading_Gdrive(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://127.0.0.1:8888/uploadfile', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            // console.log(result['file_link'])
            // console.log(`File uploaded successfully! Download link: ${result.file_link}`);
            return result['file_link']
        } else {
            console.log(`Error: ${result.error}`);
        }

    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file.');
    }
}