import { FastifyReply } from 'fastify';

export function tratarErroInterno(rep: FastifyReply, error: unknown) {
  const mensagemErro = error instanceof Error ? error.message : 'Erro desconhecido';
  rep.log.error(error);
  return rep.status(500).send({
    erro: 'Erro interno do servidor.',
    detalhe: mensagemErro,
  });
}