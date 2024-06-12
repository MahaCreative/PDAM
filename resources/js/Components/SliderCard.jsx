import { Link } from "@inertiajs/react";
import React from "react";
import { Slide } from "react-slideshow-image";

function SliderCard({ children, show }) {
    const settings = {
        autoplay: true,
        pauseOnHover: true,
        duration: 2000,
        transitionDuration: 1000,
        // canSwipe: true,
    };
    const responsiveSettings = [
        {
            breakpoint: 800,
            settings: {
                slidesToShow: show > 4 ? 4 : show,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
    ];
    return (
        <div>
            <Slide {...settings} responsive={responsiveSettings}>
                {children}
            </Slide>
        </div>
    );
}
function Item({ children, image, link }) {
    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        margin: "0 10px",
        height: "50vh",
    };
    return (
        <Link
            href={link}
            className=" w-full h-full group hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out mx-3"
        >
            <div
                className="relative rounded-lg overflow-hidden h-full"
                style={{
                    ...divStyle,
                    backgroundImage: `url(./storage/${image})`,
                }}
            >
                <div className="relative w-full h-full left-0">
                    <div className="p-3 h-full">{children}</div>
                </div>
            </div>
        </Link>
    );
}

SliderCard.Item = Item;
export default SliderCard;
