import React from 'react'

export default function StudentDetailTab(props){
    return (
        <div>
            <div>
                <div>props.name</div>
                <div>
                    <button>
                        Remove Students
                    </button>
                </div>
            </div>
            <div>
                props.email
            </div>
        </div>
    )
}