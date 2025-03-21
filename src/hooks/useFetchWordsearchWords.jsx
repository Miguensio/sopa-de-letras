function useFetchWords(wordsearchTheme, handleWordsearchInfo, handleShowWordsearch, handleIsLoading, handleError){

    const apiKey = "AIzaSyBxayQluPAL1WF547ILMXsC77qFJpbEFDQ";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `Genérame en formato Json palabras para una sopa de letras de la temática "${wordsearchTheme}". Si es aleatorio, elige una temática divertida, no palabras sin un tema que las una. En el Json deben estar las variables de: theme, words, rows, columns. El theme del Json si son varias palabras pueden haber espacios. No generes un grid, la cantidad de rows y columns serán las que creas bien para la cantidad de palabras que hay, teniendo en cuenta que es mi lógica aleatoria la que se encargará de posicionar las cosas, entonces debe haber un espacio computacionalmente aceptable. Suma 5 o 10 a la cantidad de palabras, o más dependiendo de que tan largas sean algunas. Genera palabras en el idioma en que se introduzca el tema. Las palabras deben ser en mayúsculas, si es una frase entonces no coloques espacios. Si es en español, nada de tildes.`;

    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        let jsonString = data.candidates[0].content.parts[0].text;

        jsonString = jsonString.replace(/```json\s*/, '');
        jsonString = jsonString.replace(/```\s*$/, '');

        const jsonResponse = JSON.parse(jsonString);

        handleWordsearchInfo(jsonResponse.words, jsonResponse.theme, jsonResponse.columns, jsonResponse.rows)

        handleShowWordsearch(true);
        handleIsLoading(false);
        handleError(null);
    })
    .catch(error => {
        console.log("Error de la API", error);
        handleError("Ocurrió un error procesando su acción. Intente de nuevo.");
        handleIsLoading(false);
    })
}

export default useFetchWords;