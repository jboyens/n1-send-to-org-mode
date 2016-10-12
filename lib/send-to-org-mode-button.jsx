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

        var encodedUrl = encodeURIComponent(url);
        var encodedSubject = encodeURIComponent(subject);
        var encodedSelection = encodeURIComponent(this.selection);

        var orgUrl = "org-protocol:/capture:/e/"+ encodedUrl + "/" + encodedSubject;
        if (!!this.selection) {
            orgUrl += "/" + encodedSelection;
        }

        open(orgUrl);
        this.selection = undefined;
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
                <button tabIndex="-1" className="btn btn-toolbar" title="Capture to org-mode" onClick={() => this._onClick()} onMouseOver={() => this._onMouseOver()}>
                <img src="nylas://send-to-org-mode/assets/org-mode-unicorn.svg" />
                </button>
            </div>
        );
    }
}
