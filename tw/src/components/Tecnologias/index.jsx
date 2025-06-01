import Html from "../../assets/tecnologias/html.png"
import Css from "../../assets/tecnologias/css.png"
import Java from "../../assets/tecnologias/java.sc.png"
import React from "../../assets/tecnologias/react copy.svg"
import Py from "../../assets/tecnologias/py.png"
import GitHub from "../../assets/tecnologias/github.png"
import Git from "../../assets/tecnologias/git.png"
import Vscode from "../../assets/tecnologias/vscode.png"
import Mysql from "../../assets/tecnologias/mysql.svg"
import Figma from "../../assets/tecnologias/figma.png"
import Docker from "../../assets/tecnologias/docker.png"
import Postman from "../../assets/tecnologias/postman.png"
import Tw from "../../assets/tecnologias/tailwind.png"
import Bt from "../../assets/tecnologias/bootstrap.png"



export default function Tecnologia() {
    return (
        <section className="p-4 bg-[#fffff] shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-2xl w-250 ml-46 ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-Poppi">
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Html} alt="HTML" className="mx-auto h-12" />
                    <p className="">Html</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Css} alt="CSS" className="mx-auto h-12" />
                    <p>Css</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Java} alt="JavaScript" className="mx-auto h-12" />
                    <p>JavaScript</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={React} alt="React" className="mx-auto h-12" />
                    <p>React</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Py} alt="Python" className="mx-auto h-12" />
                    <p>Python</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src="https://img.icons8.com/color/60/000000/golang.png" alt="Golang" className="mx-auto h-12" />
                    <p>Golang</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={GitHub} alt="GitHub" className="mx-auto h-12" />
                    <p>GitHub</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Git} alt="Git" className="mx-auto h-12" />
                    <p>Git</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Vscode} alt="VS Code" className="mx-auto h-12" />
                    <p>VSCode</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Mysql} alt="MySQL" className="mx-auto h-12" />
                    <p>MySQL</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Figma} alt="Figma" className="mx-auto h-12" />
                    <p>Figma</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Docker} alt="docker" className="mx-auto h-12" />
                    <p>Docker</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Postman} alt="postman" className="mx-auto h-12" />
                    <p>Postman</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Tw} alt="tailwind" className="mx-auto h-12" />
                    <p>Tailwind</p>
                </div>
                <div className="text-center hover:scale-112 transition duration-600">
                    <img src={Bt} alt="bootstrap" className="mx-auto h-12" />
                    <p>BootStrap</p>
                </div>
            </div>
        </section>

    );
}
