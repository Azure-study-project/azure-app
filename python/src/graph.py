from configparser import SectionProxy
from azure.identity import DeviceCodeCredential
from kiota_authentication_azure.azure_identity_authentication_provider import (
    AzureIdentityAuthenticationProvider)
from msgraph import GraphRequestAdapter, GraphServiceClient

from msgraph.generated.teams.get_all_messages.get_all_messages_response import GetAllMessagesResponse

from msgraph.generated.me.me_request_builder import MeRequestBuilder

class Graph:
    settings: SectionProxy
    device_code_credential: DeviceCodeCredential
    adapter: GraphRequestAdapter
    user_client: GraphServiceClient

    def __init__(self, config: SectionProxy):
        self.settings = config
        client_id = self.settings['clientId']
        tenant_id = self.settings['tenantId']
        graph_scopes = self.settings['graphUserScopes'].split(' ')
        self.device_code_credential = DeviceCodeCredential(client_id, tenant_id = tenant_id)
        auth_provider = AzureIdentityAuthenticationProvider(
            self.device_code_credential,
            scopes=graph_scopes)
        self.adapter = GraphRequestAdapter(auth_provider)
        self.user_client = GraphServiceClient(self.adapter)

    async def test_func(self):
        gamr = GetAllMessagesResponse()
        res = gamr.value
        return res
    
    async def get_user(self):
        # Only request specific properties using $select
        query_params = MeRequestBuilder.MeRequestBuilderGetQueryParameters(
            select=['displayName', 'mail', 'userPrincipalName']
        )
        request_config = MeRequestBuilder.MeRequestBuilderGetRequestConfiguration(
            query_parameters=query_params
        )

        user = await self.user_client.me.get(request_configuration=request_config)
        return user