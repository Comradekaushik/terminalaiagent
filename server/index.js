const {GoogleGenAI} = require("@google/genai"); 
const express = require('express');

const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const app =  express();

app.use(cors()); 
app.use(express.json());



const port = process.env.PORT;
const apikey = process.env.APIKEY;
const ai = new GoogleGenAI({ apiKey: apikey });

async function main(input) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${input}`,
  });
//   console.log(response.text);
  return (response.text);
}




app.post("/askwizardkaushik", async (req, res) => {
    try{
        const requestmsg = req.body.question;
        if(requestmsg.length < 5){
            const myobj = {
                "wizardresponse" : "Ask some meaningful question you Burden on earth"
            }
            // res.send(JSON.stringify(myobj));
            res.json(myobj);
        }

        const responseLLM = await main(requestmsg);
        const myobj = {
            "wizardresponse" : `Wizard Kaushik says ${responseLLM}`
        }
        res.json(myobj);




    }
    catch (error) {
        console.error(error);
        const myobj = {
            "wizardresponse" : `Some error encountered 501 (Internal Server Error) ${JSON.stringify(error)} Body: ${JSON.stringify(req.body)}`
        }
         res.json(myobj);
        


    }

})


app.listen(port, () => console.log(`Server is running on port ${port} `));


