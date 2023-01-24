const Heading = ({text, className, type}) => {

    let renderComponent;

    switch(type){
        case "small":
            renderComponent = <h5 className={className}>{text}</h5>
            break;
        case "medium":
            renderComponent = <h3 className={className}>{text}</h3>
            break;
        case "large":
            renderComponent = <h1 className={className}>{text}</h1>
            break;
        default:
            renderComponent = <h2 className={className}>{text}</h2>
            break;
    }

    return renderComponent;
}

export default Heading;