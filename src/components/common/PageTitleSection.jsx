import { ImArrowRight } from "react-icons/im";

const PageTitleSection = ({title, path}) => {
    return (
        <div className="page-title-bg w-full min-h-[340px] flex items-center justify-center dark:bg-white">
            <div className="">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-primary-black dark:text-secondary-black">{title}</h3>
                <p className="text-lg flex items-center gap-2 justify-center font-semibold my-6 text-center dark:text-secondary-black text-primary-black">
                    <span>Home</span>
                    <span className="align-middle mt-1"><ImArrowRight className="text-primary dark:text-primary"/></span>
                    <span>{path}</span>
                </p>
            </div>
        </div>
    );
};

export default PageTitleSection;