import {React} from 'nylas-exports';
import {open} from 'openurl';

export default class SendToOrgModeButton extends React.Component {
    static displayName = 'SendToOrgModeButton';

    static propTypes = {
        thread: React.PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.session !== this.props.session;
    }

    _onClick() {
        var subject = this.props.thread.subject;
        var lastDate = this.props.thread.lastMessageReceivedTimestamp.getTime() / 1000;
        var url = "nylas://?subject="+encodeURIComponent(subject)+"&lastDate="+lastDate;

        var encoded_url = encodeURIComponent(url);
        var encoded_subject = encodeURIComponent(subject);
        var encoded_selection = encodeURIComponent(this.selection);

        var action;
        if (this.selection) {
            open("org-protocol:/capture:/l/"+ encoded_url + "/" + encoded_subject + "/" + encoded_selection);
        } else {
            open("org-protocol:/capture:/l/"+ encoded_url + "/" + encoded_subject);
        }
    }

    _onMouseOver() {
        var messageList = document.getElementsByClassName("column-MessageList")[0];
        for (var iframe of messageList.getElementsByTagName("iframe")) {
            var selection = iframe.contentDocument.getSelection().toString();

            if (selection !== "") {
                this.selection = selection;
            }
        }
    }

    render() {
        return (
            <div className="my-package">
                <button tabIndex="-1" className="btn btn-toolbar" title="Capture to org-mode">
                <img src="nylas://send-to-org-mode/assets/org-mode-unicorn.svg" onClick={() => this._onClick()} onMouseOver={() => this._onMouseOver()} />
                </button>
            </div>
        );
    }
}
