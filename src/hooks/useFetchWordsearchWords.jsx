import { useEffect, useState } from "react";

export default function useFetchWords(wordsearchTheme){

    const [theme, setTheme] = useState('');
    const [words, setWords] = useState([]);
    const [columns, setColumns] = useState('');
    const [rows, setRows] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = "AIzaSyBxayQluPAL1WF547ILMXsC77qFJpbEFDQ";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const prompt = `Genérame en formato Json palabras para una sopa de letras de la temática "${wordsearchTheme}" en el Json deben estar las variables de: theme, words, rows, columns. No generes un grid, la cantidad de rows y columns serán las que creas bien para la cantidad de palabras que hay. Genera palabras en el idioma en que se introduzca el tema. Las palabras deben ser en mayúsculas, si es una frase entonces no coloques espacios. Si es en español, nada de tildes.`;

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
            if(data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
                let jsonString = data.candidates[0].content.parts[0].text;

                jsonString = jsonString.replace(/```json\s*/, '');
                jsonString = jsonString.replace(/```\s*$/, '');

                try {
                    const jsonResponse = JSON.parse(jsonString);
                    console.log(jsonResponse);

                    setTheme(jsonResponse.theme);
                    setWords(jsonResponse.words);
                    setColumns(jsonResponse.columns);
                    setRows(jsonResponse.rows);

                } 
                catch (error) {
                    console.error("Error al parsear la respuesta JSON:", error);
                    setError('Error con la respuesta del servidor');
                }
            } 
            else{
                console.log("No se pudo obtener la respuesta esperada");
            }
        })
        .catch(error => {
            console.log("Error de la API", error);
            setError("Ocurrió un error procesando su acción. Intente de nuevo después.");
        })
    }, []);

    return { theme, words, columns, rows, error };
}