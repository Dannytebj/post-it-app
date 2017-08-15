import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import TextBox from '../../../commons/textbox';
class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            newName:'',
            photoURL:'',
        };
        // this._onChange = this._onChange.bind(this);

    }
    render(){
        const { newName, photoURL } = this.state;
        return(
                <div className='form'>
                    <div className = 'editProfile'>
                <TextBox
                onChange={(value) => { this.setState({ newName: value }); }}
                label="enter New Name"
                currentValue={newName}
                />
                <ImagesUploader
                    url="http://localhost:9999/editProfile"
                    optimisticPreviews= {true}
                    multiple={false}
                    onLoadEnd = {(error) => {
                        if(err) {
                            console.log(`An error occured while uploading !: ${error}`);
                            }
                        }
                    }
                    label = "Upload Profile Picture"
                />
               Shows User Pictures! 
               </div>
               </div>
        );
    }
}
export default EditProfile;