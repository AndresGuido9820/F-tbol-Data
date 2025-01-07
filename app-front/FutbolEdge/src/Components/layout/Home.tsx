import React, { useState, useEffect } from 'react';
import Image from "./styles/Home/b6446b29303cca476cd6206a8cf30fec.jpg";
import Image2 from "./styles/Home/image (2).png";
import Image3 from "./styles/Home/image (3).png";
import Image4 from "./styles/Home/image (4).png";
import Image5 from "./styles/Home/image (5).png";
import Image6 from "./styles/Home/o_bg-remover-gen_2qj4npM8205q1fm0zhgDebdAKxs.png";
import Image7 from "./styles/Home/o_bg-remover-gen_2qj4vnT7mR9nNQsJFD9SM3aRmU1.png";
import Image8 from "./styles/Home/o_bg-remover-gen_2qj5C9TtVNApP4M79AP9LDvyBaM.png";
import Image9 from "./styles/Home/o_bg-remover-gen_2qj5EoYw7uHFv1wliOycoMgdzRi.png";

const imagesI = [Image3, Image5, Image8, Image9]; // Imágenes a mostrar en el lado izquierdo
const imagesR = [Image2, Image4, Image6, Image7]; // Imágenes a mostrar en el lado derecho
const intervalTime = 3000; // Tiempo en milisegundos (3 segundos)

const Home: React.FC = () => {
    const [offsetY, setOffsetY] = useState(0);
    const [showImages, setShowImages] = useState(false);
    const [currentImageIndexI, setCurrentImageIndexI] = useState(0); // Índice para la imagen izquierda
    const [currentImageIndexR, setCurrentImageIndexR] = useState(0); // Índice para la imagen derecha

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const deltaY = e.deltaY;

        setOffsetY((prevOffset) => {
            const newOffset = prevOffset + deltaY * 0.5; // Ajusta la sensibilidad
            return Math.min(Math.max(newOffset, -50), 0); // Entre -50% y 0%
        });

        // Mostrar imágenes al hacer scroll hacia abajo
        if (deltaY < -45) {
            setShowImages(true);
        } else {
            setShowImages(false); // Ocultar imágenes al hacer scroll hacia arriba
        }
    };

    useEffect(() => {
        // Resetea la visibilidad al volver a la parte superior
        const resetVisibility = () => setShowImages(false);
        window.addEventListener('scroll', resetVisibility);
        
        return () => {
            window.removeEventListener('scroll', resetVisibility);
        };
    }, []);

    useEffect(() => {
        // Cambiar imagen izquierda cada cierto tiempo
        const intervalI = setInterval(() => {
            setCurrentImageIndexI((prevIndex) => (prevIndex + 1) % imagesI.length); // Cambia al siguiente índice
        }, intervalTime);

        // Cambiar imagen derecha cada cierto tiempo
        const intervalR = setInterval(() => {
            setCurrentImageIndexR((prevIndex) => (prevIndex + 1) % imagesR.length); // Cambia al siguiente índice
        }, intervalTime);

        // Limpia los intervalos al desmontar el componente
        return () => {
            clearInterval(intervalI);
            clearInterval(intervalR);
        };
    }, []);

    return (
        <div
            className="relative h-screen w-full overflow-hidden"
            onWheel={handleWheel} // Captura el evento de scroll
        >
            <div className="absolute z-10 inset-0 flex flex-col items-center justify-between text-white bg-black bg-opacity-50">
                {/* Contenedor para los títulos */}
                <div className="flex flex-col items-center justify-end h-1/3">
                    <h1 className='text-5xl font-bold'>Futbol Edge</h1>
                    <h2 className='text-3xl font-semibold mt-4'>La pasión que nos une</h2>
                </div>

                {/* Contenedor para las imágenes */}
                <div className="flex items-end justify-between w-full h-2/3">
                    {/* Imagen a la izquierda de los títulos */}
                    <div className={`flex justify-start items-end overflow-visible transition-opacity duration-700 ease-in-out ${showImages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <img
                            src={imagesI[currentImageIndexI]} // Usa la imagen actual de la izquierda
                            alt={`Image Left ${currentImageIndexI + 1}`}
                            className={`h-auto w-96 object-cover transition-opacity duration-500 ease-in-out`} // Transición para la opacidad
                        />
                    </div>

                    {/* Imagen a la derecha de los títulos */}
                    <div className={`flex justify-end items-end transition-opacity duration-700 ease-in-out ${showImages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <img
                            src={imagesR[currentImageIndexR]} // Usa la imagen actual de la derecha
                            alt={`Image Right ${currentImageIndexR + 1}`}
                            className={`h-auto w-96 object-cover transition-opacity duration-500 ease-in-out`} // Transición para la opacidad
                        />
                    </div>
                </div>
            </div>

            <img
                src={Image}
                alt="cr7-picture"
                className="absolute top-0 left-0 w-full h-auto object-cover transition-transform duration-200"
                style={{
                    transform: `translateY(${offsetY}%)`,
                }}
            />
        </div>
    );
};

export default Home;
