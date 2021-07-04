class ApplicationMailer < ActionMailer::Base
  default from: 'no-reply@granite.com'
  layout 'mailer'
end