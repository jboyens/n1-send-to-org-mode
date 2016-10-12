
## org-mode and Nylas

# org-protocol.el setup
Set up for org-protocol should be done according to this:

www.diegoberrocal.com/blog/2015/08/19/org-protocol/

# Emacs Setup
``` elisp
  (org-add-link-type "nylas" 'org-nylas-open)
  (defun org-nylas-open (path)
    (browse-url (concat "nylas://" path)))
```
