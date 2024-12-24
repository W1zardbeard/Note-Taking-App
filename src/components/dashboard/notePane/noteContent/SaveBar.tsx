import CTA from '../../../CTA';

export default function SaveBar(props){
    return(
        <div className="saveBar">
            <CTA
                text="Save Note"
                style="primary"
                type="submit"
                fullWidth={false}
                clickHandler={props.saveNote}    
            />

            <CTA
                text="Cancel"
                style="secondary"
                type="submit"
                fullWidth={false}
            />
        </div>
    )
}