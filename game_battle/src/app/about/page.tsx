import React from 'react';
import Image from "next/image";
import iconAmer from "../../../Icon/AmerIcon.jpeg";
import iconAbiy from "../../../Icon/AbiyPhoto.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";


export default function About() {
  const developersList:{
    id :number;
    imge:string;
    name:string;
    title:string;
    about_text:string;
    linkGithub:string;
    linklinked:string;
  }[]= [{
    id :0,
    imge:iconAmer,
    name:"Amer",
    title:"Software Developer",
    about_text:"Software Engineer with very good knowledge of HTML5, JavaScript and SQL as well as successfully applied Responsive Designs, Clean Code: Clear code, without bugs.",
    linkGithub:"https://github.com/Al-Amer",
    linklinked:"https://www.linkedin.com/in/amer-almonajed/"
  },{
    id :1,
    imge:iconAbiy,
    name:"Abiy Alem Mehari",
    title:"Software Developer",
    about_text:"Software Engineer with very good knowledge of HTML5, JavaScript and SQL as well as successfully applied Responsive Designs, Clean Code: Clear code, without bugs.",
    linkGithub:"https://github.com/Al-Amer",
    linklinked:"https://www.linkedin.com/in/amer-almonajed/"
  },];


  return (
    <div className="flex items-start justify-center border-2 border-solid border-indigo-200 rounded-xl bg-sky-200 m-8 p-8 dark:bg-sky-800 dark:text-white flex-wrap">
			{  developersList.map((developer) => {
				return (
					<div
						key={developer.id}
						className="group flex flex-col justify-center text-center border-2 border-solid border-indigo-500 rounded-xl m-4 p-4 w-80 bg-blue-200 transition-transform duration-300 hover:scale-105"
					>
						<div className="flex justify-center">
							<Image
								src={developer.imge}
								alt={developer.name}
								className="rounded-full h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:ring-4 group-hover:ring-indigo-400"
							/>
						</div>

						<h3 className="font-serif text-xl mt-3">{developer.name}</h3>
						<p className="font-mono mt-3">{developer.title}</p>
						<p className="font-san h-70 overflow-y-auto mt-3">
							{developer.about_text}
						</p>
            <div className='flex gap-2 flex items-start justify-center'>
              <a
                href={developer.linkGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={developer.linklinked}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>

						{/* Social icons can be added here if needed */}
					</div>
				);
			})}
		</div>
  )
}
