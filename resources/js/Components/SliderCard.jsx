import React from "react";
import { Slide } from "react-slideshow-image";

function SliderCard({ children }) {
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
                slidesToShow: 4,
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
            <Slide
                slidesToScroll={1}
                slidesToShow={4}
                {...settings}
                responsive={responsiveSettings}
            >
                {children}
            </Slide>
        </div>
    );
}
function Item({ children, image }) {
    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        margin: "0 10px",
        height: "50vh",
    };
    return (
        <div className=" w-full group hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out mx-3">
            <div
                className="relative rounded-lg overflow-hidden"
                style={{
                    ...divStyle,
                    backgroundImage: `url(./storage/${image})`,
                }}
            >
                <div className="relative w-full h-full left-0 top-0">
                    <div className="p-3">{children}</div>
                </div>
            </div>
        </div>
    );
}

SliderCard.Item = Item;
export default SliderCard;
