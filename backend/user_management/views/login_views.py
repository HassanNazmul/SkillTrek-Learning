from dj_rest_auth.views import LoginView
from rest_framework import status
from rest_framework.response import Response


# CustomLoginView modifies the default dj-rest-auth LoginView to include
class CustomLoginView(LoginView):
    """
    CustomLoginView modifies the default dj-rest-auth LoginView to include
    additional user information in the response.
    """

    def get_response(self):
        # Get the original response
        original_response = super().get_response()

        # Add custom data to the response
        user = self.user
        custom_data = {
            'key': original_response.data['key'],
            'user_type': user.user_type,
        }

        # Return the modified response with the token and additional user info
        return Response(custom_data, status=status.HTTP_200_OK)
